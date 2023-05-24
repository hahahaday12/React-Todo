const { VITE_APP_YOUTUBE_KEY, VITE_APP_TODO_HEADER_KEY, VITE_APP_TODO_HEADER_USERNAME, VITE_APP_WEATHER_KEY } = import.meta.env;

const options = (method, param) => ({
  method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': VITE_APP_TODO_HEADER_KEY,
        'username': VITE_APP_TODO_HEADER_USERNAME
      },
      body: JSON.stringify(param)
})

const URL = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";

export const todoPost = async (title) => {
  const res = await fetch(URL,options("POST", {title}));
  const param = await res.json();
  return param;
};

export const getTodo = async () => {
  const res = await fetch(URL, options("GET"));
  const param = await res.json();
  return param;
}

export const deletTodo = async (id) => {
  const res = await fetch(`${URL}/${id}`, options("DELETE"));
  const param = await res.json();
  return param;
}

export const changeTodo = async (id, dataToSend) => {
  const requestOptions = options('PUT', dataToSend);
  const res = await fetch(`${URL}/${id}`, requestOptions);
  const param = await res.json();
  return param;
};

const YOUTUBEURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&key=${VITE_APP_YOUTUBE_KEY}&playlistId=PLEjyqb6DF-9YjQTueKFtbqIWLaMGJzVX5`;

export const getYoutube = async () => {
  const res = await fetch(`${YOUTUBEURL}`);
  const json = await res.json();
  return json;
}

export const getWeather = async (pos) => {
  const WEATHERURL = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&lang=kr&appid=${VITE_APP_WEATHER_KEY}&units=metric`;
  const res = await fetch(`${WEATHERURL}`);
  const json = await res.json();
  return json;
}


