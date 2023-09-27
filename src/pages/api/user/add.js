import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    console.log(request.body);
    const {userEmail, name, email, phone, yout, insta} = request.body;
    console.log(name, email, phone, yout, insta)
    if (!name || !email || !phone) throw new Error('Required Fields Missing');
    const result = await sql`INSERT INTO users (Useremail, Email, Name, Phone, Instagram_link, Youtube_link) VALUES (${userEmail}, ${email}, ${name}, ${phone}, ${yout ?? ""}, ${insta ?? ""});`;
    return response.status(200).json({ result });
  } catch (error) {
    console.log(error)
    return response.status(500).json({ error });
  }
}