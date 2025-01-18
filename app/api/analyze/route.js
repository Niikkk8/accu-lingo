// pages/api/analyze.js (for Pages Router)
// or
// app/api/analyze/route.js (for App Router)

export async function POST(req) {
    try {
        const response = await fetch('https://market-insights-api.onrender.com/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(await req.json()),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}