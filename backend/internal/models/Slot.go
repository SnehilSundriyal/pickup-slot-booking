package models

type Slot struct {
	ID          int    `json:"id"`
	Label       string `json:"label"`
	Date        string `json:"date"`
	StartTime   string `json:"startTime"`
	EndTime     string `json:"endTime"`
	MaxCapacity int    `json:"maxCapacity"`
	BookedCount int    `json:"bookedCount"`
	Available   int    `json:"available"`
	Blocked     bool   `json:"blocked"`
}

type BlockSlotRequest struct {
	Blocked bool `json:"blocked"`
}
