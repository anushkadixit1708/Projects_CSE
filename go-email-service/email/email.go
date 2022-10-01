package email

import (
	"fmt"
	"net/smtp"
	"os"

	"github.com/joho/godotenv"
)

func Send(sender string, body string) {
	err0 := godotenv.Load(".env")
	if err0 != nil {
		fmt.Println(err0)
	}
	// Sender data.
	from := os.Getenv("FROM")
	password := os.Getenv("PASS")

	// Receiver email address.
	to := []string{
		os.Getenv("FROM"),
	}

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Message.
	message := []byte(sender + "\n" + body)

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Email Sent Successfully! From " + sender)
}
