package main

import (
	"log"

	"github.com/SnehilSundriyal/pickup-slot-booking/internal/driver"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/repository"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/repository/dbrepo"
	"github.com/SnehilSundriyal/pickup-slot-booking/internal/utils"
	"github.com/gin-gonic/gin"
)

const port = ":8080"

type application struct {
	DB repository.DatabaseRepo
}

func main() {
	gin.SetMode(gin.ReleaseMode)

	db, err := driver.ConnectSQL()
	if err != nil {
		log.Fatal(err)
	}

	repo := dbrepo.NewMysqlRepo(db.SQL)

	err = utils.SeedSlots(db.SQL)
	if err != nil {
		log.Fatal(err)
	}

	var app application
	app = application{
		DB: repo,
	}

	server := app.routes()
	log.Println("Starting API on port 8080...")
	log.Println(`
  ______    ______       ______    ______   __
 /\  ___\  /\  __ \     /\  __ \  /\  == \ /\ \
 \ \ \__\\ \ \ \/\ \    \ \ \_\ \ \ \  __/ \ \ \
  \ \_____\ \ \_____\    \ \_\ \_\ \ \_\    \ \_\
   \/_____/  \/_____/     \/_/\/_/  \/_/     \/_/

`)
	err = server.Run(port)
	if err != nil {
		log.Fatal(err)
	}

}
