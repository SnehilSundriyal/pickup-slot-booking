package utils

import (
	"database/sql"
	"fmt"
	"log"
	"time"
)

type SeedSlot struct {
	Label       string
	StartTime   string
	EndTime     string
	MaxCapacity int
}

var defaultSlots = []SeedSlot{
	{
		Label:       "7 AM - 9 AM",
		StartTime:   "07:00:00",
		EndTime:     "09:00:00",
		MaxCapacity: 8,
	},
	{
		Label:       "9 AM - 11 AM",
		StartTime:   "09:00:00",
		EndTime:     "11:00:00",
		MaxCapacity: 10,
	},
	{
		Label:       "11 AM - 1 PM",
		StartTime:   "11:00:00",
		EndTime:     "13:00:00",
		MaxCapacity: 10,
	},
	{
		Label:       "2 PM - 4 PM",
		StartTime:   "14:00:00",
		EndTime:     "16:00:00",
		MaxCapacity: 8,
	},
	{
		Label:       "4 PM - 6 PM",
		StartTime:   "16:00:00",
		EndTime:     "18:00:00",
		MaxCapacity: 6,
	},
}

func SeedSlots(db *sql.DB) error {

	for i := 0; i < 3; i++ {

		date := time.Now().
			AddDate(0, 0, i).
			Format("2006-01-02")

		for _, slot := range defaultSlots {

			var exists bool

			checkQuery := `
				SELECT EXISTS(
					SELECT 1
					FROM slots
					WHERE date = ?
					AND start_time = ?
				)
			`

			err := db.QueryRow(
				checkQuery,
				date,
				slot.StartTime,
			).Scan(&exists)

			if err != nil {
				return err
			}

			if exists {
				continue
			}

			insertQuery := `
				INSERT INTO slots (
					label,
					date,
					start_time,
					end_time,
					max_capacity,
					booked_count,
					blocked
				)
				VALUES (?, ?, ?, ?, ?, 0, false)
			`

			_, err = db.Exec(
				insertQuery,
				slot.Label,
				date,
				slot.StartTime,
				slot.EndTime,
				slot.MaxCapacity,
			)

			if err != nil {
				return err
			}

			log.Printf(
				"Seeded slot: %s (%s)",
				slot.Label,
				date,
			)
		}
	}

	fmt.Println("Slot seeding complete")

	return nil
}
