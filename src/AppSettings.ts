let server: string;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  server = "https://localhost:44330";
} else {
  server = "https://qandabackend20200925.azurewebsites.net";
}

const webAPIUrl = `${server}/api`;

export { server, webAPIUrl };
