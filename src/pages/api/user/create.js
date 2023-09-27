import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  response.status(400).json({
    message : "You should not be here!!"
  })
  // try {
  //   await sql`DROP TABLE users`;
  //   const result =
  //     await sql` CREATE TABLE users (
  //       id SERIAL PRIMARY KEY,
  //       userEmail VARCHAR(255) UNIQUE NOT NULL,
  //       email VARCHAR(255) NOT NULL,
  //       name VARCHAR(255) NOT NULL,
  //       phone VARCHAR(20),
  //       instagram_link VARCHAR(255),
  //       youtube_link VARCHAR(255)
  //     );`;
  //   return response.status(200).json({ result });
  // } catch (error) {
  //   return response.status(500).json({ error });
  // }
}
