const express = require("express")

const path = require("path")

// initiate server
const app = express()

// For Heroku - Only require dotenv when NODE_ENV is set to development
if (process.env.NODE_ENV === "development") {
	require("dotenv").config({ silent: true })
}

//utilize express as middleware for the server
//server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, "..", "..", "public")))
app.get("/", (req, res) =>
	res.sendFile(path.join(__dirname, "..", "..", "public/index.html"))
)

// body-parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API router
app.use("/api", require("./api/routes"))

app.use((err, req, res, next) => {
	if (process.env.NODE_ENV !== "test") console.error(err.stack)
	res.status(err.status || 500).send(err.message || "Internal server error")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
	console.log(`🚀 Server ready at http://localhost:${PORT}`)
)

module.exports = app
