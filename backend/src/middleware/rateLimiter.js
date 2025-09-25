import ratelimit from "../../config/upsatsh.js"

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit('my-limit_key')
        if(!success) {
            return res.status(429).json({message:"Too many request try again later"})
        }

        next()
    } catch (error) {
        console.log('Rate limit errror', error);
        next(error)
    }
}

export default rateLimiter