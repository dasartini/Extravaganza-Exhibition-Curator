import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton,RedditIcon, RedditShareButton, TwitterShareButton, XIcon, WhatsappShareButton, WhatsappIcon, LinkedinIcon, LinkedinShareButton} from "react-share"


function Share ({id} ) {
const shareUrl = `https://extravaganzart.netlify.app/${id}`
const title = "Check out this amazing artwork! "
const img = `https://www.artic.edu/iiif/2/${id}/full/400,/0/default.jpg`
    return (
    
    <>
<div style={{textAlign: "center", marginTop: "30px",}}>
    <h3> Share this with your friends</h3>
        <div style={{display:"flex", justifyContent:"center", gap:"10px", marginTop:"10px" }}>
            <FacebookShareButton  url={shareUrl} hashtag={title}>
            <FacebookIcon size={30} round/>
            </FacebookShareButton>
            <RedditShareButton  url={shareUrl} title={title}>
            <RedditIcon size={30} round/>
            </RedditShareButton>
            <TwitterShareButton  url={shareUrl} title={title}>
                <XIcon size={30} round></XIcon>
            </TwitterShareButton>
            <WhatsappShareButton  url={shareUrl} title={title}>
                <WhatsappIcon size={30} round/>
            </WhatsappShareButton>
            <LinkedinShareButton title={title} url={shareUrl} >
                <LinkedinIcon size={30} round/>
            </LinkedinShareButton>
            <TelegramShareButton media={img} url={shareUrl} description={title}>
                <TelegramIcon size={30} round/>
            </TelegramShareButton>
            
        </div>
</div>
</>
    )
}

export default Share