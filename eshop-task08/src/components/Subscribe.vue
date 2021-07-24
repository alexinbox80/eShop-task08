<template>
    <div class="footer__background">
        <!--<img class="footer__backgroun-img" src="img/footerbg.png" alt="background">-->
        <div class="footer__content center">
            <div class="footer__content-left">
                <div class="footer__left-info">
                    <img class="subscribe__img" src="../assets/img/subsface.png" alt="subscribe face">
                    <p class="subscribe__inftext">“Vestibulum quis porttitor dui! Quisque viverra nunc mi,
                        <span class="subscribe__inftext-ital">a pulvinar purus condimentum“</span></p>
                </div>
            </div>
            <div class="footer__content-right">
                <p class="subscribe__text"><span class="subscribe__text-bold">SUBSCRIBE</span><br>FOR OUR NEWLETTER
                    AND PROMOTION</p>
                <form action="#">
                    <div class="subscribe">
                        <input class="subscribe__email" type="email" placeholder="Enter Your Email" required>
                        <button class="subscribe__submit" type="submit">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Subscribe'
}
</script>