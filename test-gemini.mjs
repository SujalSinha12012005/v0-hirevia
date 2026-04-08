const apiKey = "AIzaSyCWz8gRt21DiE4J6jjZ8hNMnuzVBy3ekSo";

async function run() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  if (data.models) {
    console.log("SUPPORTED MODELS:");
    for (const m of data.models) {
      console.log(m.name);
    }
  } else {
    console.log(data);
  }
}

run();
