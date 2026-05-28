package main

import (
	"net/http"

	"github.com/SnehilSundriyal/pickup-slot-booking/internal/models"
	"github.com/gin-gonic/gin"
)

func (app *application) GetSlots(c *gin.Context) {
	date := c.Query("date")

	slots, err := app.DB.GetSlots(date)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error getting slots",
			"error":   err,
		})
		return
	}

	c.JSON(http.StatusOK, slots)
}

func (app *application) CreateBooking(c *gin.Context) {

	var req models.BookingRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})

		return
	}

	booking, err := app.DB.CreateBookingWithValidation(req)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, booking)
}

func (app *application) ToggleSlotBlock(c *gin.Context) {

	slotID := c.Param("id")

	var req models.BlockSlotRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})

		return
	}

	err = app.DB.UpdateSlotBlockStatus(
		slotID,
		req.Blocked,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Slot updated successfully",
	})
}

func (app *application) GetBookings(c *gin.Context) {

	slotID := c.Query("slotId")

	bookings, err := app.DB.GetBookingsBySlotID(slotID)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, bookings)
}
