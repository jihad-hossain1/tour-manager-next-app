

'use server';

export async function verifyUser(info: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/users/verify-user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...info}),
      });

      const data = await response.json();

      return data;
}

