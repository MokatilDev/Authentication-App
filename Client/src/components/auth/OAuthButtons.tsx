// Icons 
import twitterLogo from "../../assets/icons/twitter.svg";
import discordLogo from "../../assets/icons/discord.svg";


type OAuthButtonsProps = {
    title: string,
    discordUrl: string,
    twitterUrl: string,
}


function OAuthButtons({ title, discordUrl, twitterUrl }: OAuthButtonsProps) {
    return (
        <div className="max-w-[370px] mt-2 w-full">
            <div className="flex items-center justify-center mt-1">
                <div className="border-t border-amber-300 flex-grow"></div>
                <span className="px-2 text-white text-base font-semibold">
                    {title}
                </span>
                <div className="border-t border-amber-300 flex-grow"></div>
            </div>

            <div className="flex gap-4 justify-center  py-2">
                <a href={discordUrl}>
                    <button className="py-2 px-7 bg-[#5865F2] rounded text-base font-semibold flex justify-center items-center gap-2" >
                        <img src={discordLogo} className="w-6 bg-[#5865F2]" />
                        Discord
                    </button>
                </a>

                <a href={twitterUrl}>
                    <button className="py-2 px-8 text-white bg-[#000] rounded text-base font-semibold flex justify-center items-center" >
                        <img src={twitterLogo} className="w-7 bg-[#000]" />
                        Twitter
                    </button>
                </a>

            </div>
        </div>
    )
}

export default OAuthButtons