package main

import (
	"log"
	"os"

	"github.com/SnehilSundriyal/pickup-slot-booking/internal/driver"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/repository"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/repository/dbrepo"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/utils"
	"github.com/gin-gonic/gin"
)

type application struct {
	DB repository.DatabaseRepo
}

func main() {

	gin.SetMode(gin.ReleaseMode)

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	db, err := driver.ConnectSQL()

	if err != nil {
		log.Fatal(err)
	}

	repo := dbrepo.NewMysqlRepo(db.SQL)

	err = utils.SeedSlots(db.SQL)

	if err != nil {
		log.Fatal(err)
	}

	app := application{
		DB: repo,
	}

	server := app.routes()

	log.Printf("Server starting on port %s\n", port)

	err = server.Run(":" + port)

	if err != nil {
		log.Fatal(err)
	}
}
