package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (app *application) routes() *gin.Engine {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/slots", app.GetSlots)
	router.POST("/bookings", app.CreateBooking)
	router.PATCH("/slots/:id/block", app.ToggleSlotBlock)
	router.GET("/bookings", app.GetBookings)

	return router
}
