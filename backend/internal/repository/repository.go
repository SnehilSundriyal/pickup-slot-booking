package repository

import "github.com/SnehilSundriyal/pickup-slot-booking/internal/models"

type DatabaseRepo interface {
	GetSlots(date string) ([]models.Slot, error)
	CreateBookingWithValidation(req models.BookingRequest) (*models.Booking, error)
	UpdateSlotBlockStatus(slotID string, blocked bool) error
	GetBookingsBySlotID(slotID string) ([]models.Booking, error)
}
