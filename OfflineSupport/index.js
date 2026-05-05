function registerSirviceWorkerOnRootFile() {
  if (!navigator.serviceWorker) {
    return;
  }

  navigator.serviceWorker
    .register("./sw.js", {
      scope: "./",
    })
    .then((res) => console.log("Service worker is registered Successfully"))
    .catch((err) => console.log("Error while registering Service Worker", err));
}

registerSirviceWorkerOnRootFile();
