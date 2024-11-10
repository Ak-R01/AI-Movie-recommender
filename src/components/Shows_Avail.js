const streamingAvailability = require("streaming-availability")

const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY
const client = new streamingAvailability.Client(
    new streamingAvailability.Configuration({
        apiKey: RAPID_API_KEY,
    })
)

async function check_avail(text) {
    if (text === "") {
        alert("Please provide Input")
        return { n: false, a: false, p: false, h: false, hu: false }
    }
    console.log(text)
    let data = null
    try {
        data = await client.showsApi.searchShowsByTitle({
            title: text,
            country: "in",
            seriesGranularity: "show",
            showType: "movie",
        })
    } catch (error) {
        console.error("Error fetching shows:", error) // or {}
    }

    if (!data || !data[0].streamingOptions || !data[0].streamingOptions.in) {
        console.error("No streaming options available")
        return { n: false, a: false, p: false, h: false, hu: false }
    }
    let n = false
    let a = false
    let p = false
    let h = false
    let hu = false
    // console.log(data)
    const streams = data[0].streamingOptions.in
    for (let i = 0; i < streams.length; i++) {
        switch (streams[i].service.id) {
            case "apple":
                a = true
                break
            case "prime":
                p = true
                break
            case "netflix":
                n = true
                break
            case "hulu":
                hu = true
                break
            case "hotstar":
                h = true
                break
            default:
                break
        }
    }
    console.log(streams)
    return { n, a, p, h, hu }
}

export default check_avail
