async function callBackend() {
  const output = document.getElementById("output");

  try {
    const response = await fetch("https://your-techie.onrender.com/");
    const data = await response.json();

    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    output.textContent = "Error connecting to backend: " + error;
  }
}
