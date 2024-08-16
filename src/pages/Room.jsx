import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, LogOut } from "lucide-react";
import axiosInstance from "../utils/axiosConfig";

export default function Room() {
  const [room, setRoom] = useState("");
  const [availRoom, setAvailRoom] = useState([]);
  const [hostId, setHostId] = useState();
  const [loading, setLoading] = useState(true);

  const data = JSON.parse(sessionStorage.getItem("data"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get(`/user/${data.username}`)
        .then((response) => setHostId(response.data.user.id));
    };
    return () => {
      fetchData();
    };
  }, [data.username]);

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get("/room").then((response) => {
        setAvailRoom(response.data);
        if (response.data) {
          setLoading(false);
        }
      });
    };
    return () => {
      fetchData();
    };
  }, []);

  const submitted = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/room", {
        name_room: room,
        host_id: hostId,
        host_name: data.username,
      })
      .then((response) => {
        console.log(response);
        if (response.data.room) {
          const user = JSON.parse(sessionStorage.getItem("data"));
          user.room_id = response.data.room.id;
          user.token = data.token;
          sessionStorage.setItem("data", JSON.stringify(user));
          navigate("/chat");
        }
      })
      .catch((err) => console.error(err));
  };

  const joinRoom = async (room_id) => {
    await axiosInstance.get(`/room/${room_id}`).then((response) => {
      if (response.data.room) {
        const user = JSON.parse(sessionStorage.getItem("data"));
        user.room_id = response.data.room.id;
        user.token = data.token;
        sessionStorage.setItem("data", JSON.stringify(user));
        navigate("/chat");
      }
    });
  };

  const logOut = () => {
    sessionStorage.removeItem("data");
    navigate("/login");
  };

  return (
    <main className="bg-slate-900 min-h-screen">
      <nav className="bg-slate-800 text-white p-4 shadow-sm shadow-blue-500/50">
        <div className="flex justify-between">
          <div>{data.username}</div>
          <button onClick={logOut}>
            <LogOut />
          </button>
        </div>
      </nav>
      <div className="flex items-center flex-col mt-2">
        <span className="text-white font-semibold">Host a room :</span>
        <form onSubmit={submitted} method="POST" className="m-2">
          <input
            type="text"
            placeholder="Masukkan nama Room..."
            id="name"
            name="name"
            onChange={(e) => setRoom(e.target.value)}
            autoComplete="off"
            className="bg-white focus:ring-4 focus:outline-blue-300/30 focus:ring-blue-500/50 rounded-md p-2  border-black s border-2"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-800 text-white font-semibold rounded-md shadow-md"
          >
            Create
          </button>
        </form>
      </div>

      <div className="flex items-center flex-col gap-2">
        <span className="text-white font-semibold">
          Join an Available Room :
        </span>
        <section className="flex gap-4 flex-wrap justify-center">
          {loading ? (
            <LoaderCircle className="animate-spin text-white" />
          ) : (
            availRoom.map((data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => joinRoom(data.id)}
                  className="rounded-lg bg-slate-900 p-2  border text-white  h-20 w-40 text-center hover:cursor-pointer hover:border-blue-300 hover:border  transition-all hover:shadow-indigo-600/50 hover:shadow-lg"
                >
                  <h3 className="font-bold">{data.name_room}</h3>
                  <span> Host :{data.host_name}</span>
                </div>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
}
