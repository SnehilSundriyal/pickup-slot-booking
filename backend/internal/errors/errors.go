package errors

import "errors"

var (
	ErrSlotNotFound     = errors.New("slot does not exist")
	ErrSlotBlocked      = errors.New("this slot is blocked")
	ErrSlotFull         = errors.New("this slot is already full")
	ErrDuplicateBooking = errors.New("phone number already booked this slot")
)
