package dbrepo

import (
	"database/sql"

	customerrors "github.com/SnehilSundriyal/pickup-slot-booking/internal/errors"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/models"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/repository"
)

type mysqlDBRepo struct {
	DB *sql.DB
}

func NewMysqlRepo(conn *sql.DB) repository.DatabaseRepo {
	return &mysqlDBRepo{
		DB: conn,
	}
}

func (m *mysqlDBRepo) GetSlots(date string) ([]models.Slot, error) {

	query := `
	SELECT
		s.id,
		s.label,
		s.date,
		s.start_time,
		s.end_time,
		s.max_capacity,
		s.blocked,
		COUNT(b.id) AS booked_count
	FROM slots s
	LEFT JOIN bookings b
		ON s.id = b.slot_id
	WHERE s.date = ?
	GROUP BY
		s.id,
		s.label,
		s.date,
		s.start_time,
		s.end_time,
		s.max_capacity,
		s.blocked
`

	rows, err := m.DB.Query(query, date)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var slots []models.Slot

	for rows.Next() {

		var slot models.Slot

		var dateBytes []byte
		var startTime []byte
		var endTime []byte

		err := rows.Scan(
			&slot.ID,
			&slot.Label,
			&dateBytes,
			&startTime,
			&endTime,
			&slot.MaxCapacity,
			&slot.Blocked,
			&slot.BookedCount,
		)

		if err != nil {
			return nil, err
		}

		slot.Date = string(dateBytes)
		slot.StartTime = string(startTime)
		slot.EndTime = string(endTime)

		slot.Available = slot.MaxCapacity - slot.BookedCount

		slots = append(slots, slot)
	}

	return slots, nil
}

func (m *mysqlDBRepo) CreateBookingWithValidation(req models.BookingRequest) (*models.Booking, error) {

	tx, err := m.DB.Begin()
	if err != nil {
		return nil, err
	}

	defer tx.Rollback()

	var slot models.Slot

	slotQuery := `
		SELECT
			id,
			label,
			date,
			start_time,
			end_time,
			max_capacity,
			blocked
		FROM slots
		WHERE id = ?
		FOR UPDATE
	`

	var date []byte
	var startTime []byte
	var endTime []byte

	err = tx.QueryRow(slotQuery, req.SlotID).Scan(
		&slot.ID,
		&slot.Label,
		&date,
		&startTime,
		&endTime,
		&slot.MaxCapacity,
		&slot.Blocked,
	)

	if err == sql.ErrNoRows {
		return nil, customerrors.ErrSlotNotFound
	}

	if err != nil {
		return nil, err
	}

	slot.Date = string(date)
	slot.StartTime = string(startTime)
	slot.EndTime = string(endTime)

	if slot.Blocked {
		return nil, customerrors.ErrSlotBlocked
	}

	var bookingCount int

	countQuery := `
		SELECT COUNT(*)
		FROM bookings
		WHERE slot_id = ?
	`

	err = tx.QueryRow(countQuery, req.SlotID).Scan(&bookingCount)
	if err != nil {
		return nil, err
	}

	if bookingCount >= slot.MaxCapacity {
		return nil, customerrors.ErrSlotFull
	}

	var duplicateCount int

	duplicateQuery := `
		SELECT COUNT(*)
		FROM bookings
		WHERE slot_id = ?
		AND customer_phone = ?
	`

	err = tx.QueryRow(
		duplicateQuery,
		req.SlotID,
		req.CustomerPhone,
	).Scan(&duplicateCount)

	if err != nil {
		return nil, err
	}

	if duplicateCount > 0 {
		return nil, customerrors.ErrDuplicateBooking
	}

	booking := models.Booking{
		SlotID:        req.SlotID,
		CustomerName:  req.CustomerName,
		CustomerPhone: req.CustomerPhone,
		Address:       req.Address,
	}

	insertQuery := `
		INSERT INTO bookings (
			id,
			slot_id,
			customer_name,
			customer_phone,
			address
		)
		VALUES (?, ?, ?, ?, ?)
	`

	_, err = tx.Exec(
		insertQuery,
		booking.ID,
		booking.SlotID,
		booking.CustomerName,
		booking.CustomerPhone,
		booking.Address,
	)

	if err != nil {
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		return nil, err
	}

	return &booking, nil
}

func (m *mysqlDBRepo) UpdateSlotBlockStatus(slotID string, blocked bool) error {
	query := `
		UPDATE slots
		SET blocked = ?
		WHERE id = ?
	`

	_, err := m.DB.Exec(
		query,
		blocked,
		slotID,
	)

	return err
}

func (m *mysqlDBRepo) GetBookingsBySlotID(slotID string) ([]models.Booking, error) {

	query := `
		SELECT
			id,
			slot_id,
			customer_name,
			customer_phone,
			address,
			created_at
		FROM bookings
		WHERE slot_id = ?
	`

	rows, err := m.DB.Query(query, slotID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var bookings []models.Booking

	for rows.Next() {

		var booking models.Booking

		var createdAt []byte

		err := rows.Scan(
			&booking.ID,
			&booking.SlotID,
			&booking.CustomerName,
			&booking.CustomerPhone,
			&booking.Address,
			&createdAt,
		)

		if err != nil {
			return nil, err
		}

		booking.CreatedAt = string(createdAt)

		bookings = append(bookings, booking)
	}

	return bookings, nil
}
