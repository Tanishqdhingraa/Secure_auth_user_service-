import app from './app.js'

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
