FROM golang

WORKDIR /

COPY . .

RUN go mod download

EXPOSE 4000

CMD ["go", "run", "main.go"]