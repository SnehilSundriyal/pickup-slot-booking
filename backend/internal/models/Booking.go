package models

type Booking struct {
	ID            int    `json:"id"`
	SlotID        int    `json:"slotId"`
	CustomerName  string `json:"customerName"`
	CustomerPhone string `json:"customerPhone"`
	Address       string `json:"address"`
	CreatedAt     string `json:"createdAt"`
}

type BookingRequest struct {
	SlotID        int    `json:"slotId"`
	CustomerName  string `json:"customerName"`
	CustomerPhone string `json:"customerPhone"`
	Address       string `json:"address"`
}
