package driver

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	SQL *sql.DB
}

func ConnectSQL() (*DB, error) {

	dsn := "root:Snehil@0802@tcp(127.0.0.1:3306)/slot_booking"

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	log.Println("Connected to MySQL!")

	return &DB{
		SQL: db,
	}, nil
}
