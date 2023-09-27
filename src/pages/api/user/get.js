import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    console.log(request.body);
    const { email} = request.body;
    console.log(email)
    if ( !email ) throw new Error('Required Fields Missing');
    const result = await sql`SELECT * FROM users;`;
    console.log(result.rows);
    let userData = {};
    for(let i=0;i<result.rows.length; i++){
        const curr = result.rows[i];
        if(curr.useremail===email) {
            userData = curr;
            break;
        }
    }
    console.log(userData);
    return response.status(200).json({ data : userData });
  } catch (error) {
    console.log(error)
    return response.status(500).json({ error });
  }
}