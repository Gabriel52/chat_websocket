import { http } from "./http";
import './websocket/client';
import './websocket/admin';

const PORT = 3000 || process.env.PORT
http.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
