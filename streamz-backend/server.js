const express = require("express");
const path = require("path");
const cors = require("cors");
require("./db/connection");
const userRoutes = require("./routes/user");
const channelRoutes = require("./routes/channel");
const streamRoutes = require("./routes/stream");
const nms = require("./nodeMediaServer");
const thumbnail_generator = require("./cron/thumbnails");

const app = express();
const PORT = process.env.PORT;
const dirname = path.resolve();

app.use("/thumbnails", express.static(path.join(dirname, "/thumbnails")));
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/streams", streamRoutes);

app.use(express.static(path.join(dirname, "/streamz-frontend/build")));
app.get("*", (req, res) =>
	res.sendFile(path.resolve(dirname, "streamz-frontend", "build", "index.html"))
);

app.listen(PORT, () => console.log(`Server is up and Listening on http://localhost:${PORT}`));
nms.run();
thumbnail_generator.start();
