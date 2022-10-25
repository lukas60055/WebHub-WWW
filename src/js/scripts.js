'use strict';
import '../../src/scss/main.scss';

// AOS
AOS.init({
    duration: 700,
    delay: 100,
    easing: "ease-out-quad",
    once: !0,
    startEvent: "load"
});

// variables
let a = 0;
var path = location.pathname;
var URL = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search

//particlesJS
if(path.substring(path.lastIndexOf('/')) === '/index' || path.substring(path.lastIndexOf('/')) === '/' || path.substring(path.lastIndexOf('/')) === '/bezplatna-wycena') {
    particlesJS.load('particles-js', 'js/JSON/particles.json');
};

$(window).on("load", function() {
    // Active link in menu
    $('.nav__menu--link').each(function(i, e) {
        if($(e).attr('href') === URL) {
            $(`.nav__menu--link:eq(${i})`).addClass('active-nav');
        };
    });
    // Hamburger
    $('.nav__hamburger').on("click", function() {
        $('.site-header__nav').toggleClass('nav--open');
    });

    // nav link animation
    $('.nav__menu--item').on("mouseover", function() {
        if($(window).width() >= 844) {
            if($(this).has('.hover').length === 0 && $(this).has('.nav__menu--btn').length === 0) {
                $(this).prepend('<div class="hover"></div>');
                $('.hover').animate({
                    width: "90%"
                }, 200);
            };
        };
    });

    $('.nav__menu--item').on("mouseout", function() {
        $('.hover').animate({
            width: 0
        }, 200, function() {
            $(this).remove();
        });
    });

    // offer link animation
    $('.offer__link').on("mouseover", function() {
        if($(window).width() >= 960) {
            if($(this).has('.hover').length === 0) {
                $(this).append('<div class="hover"></div>');
                $('.hover').css({
                    marginTop: "5px"
                }).animate({
                    width: "70%"
                }, 200);
            };
        };
    });

    $('.offer__link').on("mouseout", function() {
        $('.hover').animate({
            width: 0
        }, 200, function() {
            $(this).remove();
        });
    });

    // link to form - offer
    $('.offer__link').each((i, element) => {
        $(element).on("click", function() {
            localStorage.setItem('form', i);
        });
    });

    // nav fixed
    $(window).on("scroll", function() {
        if($(window).width() <= 860 && $(window).scrollTop() > 265 && a === 0) {
            $('.site-header__nav').css({
                position: "fixed",
                borderBottom: "1px solid #707070",
                opacity: 0
            }).animate({
                opacity: 1
            }, 600);
            a = 1;
        } else if($(window).width() <= 860 && $(window).scrollTop() < 200 && a === 1) {
            $('.site-header__nav').animate({
                height: 0,
                opacity: 0
            }, 300, function() {
                $(this).animate({
                    height: 62
                }, 300).css({
                    position: "relative",
                    borderBottom: "none",
                    opacity: 1
                })
            });
            a = 0;
        };
    });

    // Animation text header
    $(document).ready(function() {
        if(path.substring(path.lastIndexOf('/')) === '/index' || path.substring(path.lastIndexOf('/')) === '/') {
            $('.site-header__h2:eq(0)').stop().delay(200).animate({
                marginLeft: "6vw",
                opacity: 1
            }, 1000);
            $('.site-header__h2:eq(1)').stop().delay(600).animate({
                marginLeft: "6vw",
                opacity: 1
            }, 1000);
            $('.site-header__h2:eq(2)').stop().delay(1000).animate({
                marginLeft: "6vw",
                opacity: 1
            }, 1000);
        };
    });

    // Counter statistics
    $(window).on("scroll", function() {
        if(path.substring(path.lastIndexOf('/')) === '/index' || path.substring(path.lastIndexOf('/')) === '/') {
            if (!$('.count_1').is('.animate') && $(window).width() >= 768 && $('.site-section__statistics').eq(0).is('.aos-animate')) {
                counter('.count_1');
                counter('.count_2');
                counter('.count_3');
            } else if (!$('.count_1').is('.animate') && $(window).width() < 768 && $('.site-section__statistics').eq(0).is('.aos-animate')) {
                counter('.count_1');
            } else if (!$('.count_2').is('.animate') && $(window).width() < 768 && $('.site-section__statistics').eq(1).is('.aos-animate')) {
                counter('.count_2');
            } else if (!$('.count_3').is('.animate') && $(window).width() < 768 && $('.site-section__statistics').eq(2).is('.aos-animate')) {
                counter('.count_3');
            };
        } return;
    });

    // link priceTable
    $('.priceTable__content--plus').on("click", function(event) {
        const target = $('#main');

        if(target.length && $(window).width() < 768) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 105
            }, 1500);
        };
    });

    // link to form - priceTable
    $($('.priceTable__content--btn').get().reverse()).each((i, element) => {
        $(element).on("click", function() {
            if(i <= 1) {
                localStorage.setItem('form', i);
            };
        });
    });

    // footer mail
    $('.site-footer__box--link:first').on("click", function(e) {
        e.preventDefault();
        if($(this).parent().find('.mail').length !== 1) {
            $(this).before('<div class="mail">kontakt@web-hub.pl</div>');
            $('.mail').animate({
                opacity: 1
            }, 500);
            setTimeout(function() {
                $('.mail').remove();
            }, 10000);
        } else {
            $('.mail').remove();
        };
    });

    // faq
    $('.contact__faq--content').on("click", function() {
        $(this).toggleClass('faq--open').parent().find('.contact__faq--object').slideToggle(700);
    });

    // contact form
    $('#contact').submit(function(event) {
        event.preventDefault();
        grecaptcha.ready(function () {
            grecaptcha.execute('6LfT9SUaAAAAAD7rxYg1C0dj1eGDcQyADROcYqau', { action: 'php/contact' }).then(function(token) {
               var recaptchaResponse = document.getElementById('recaptchaResponse');
               recaptchaResponse.value = token;
               $.ajax({
                type: $('#contact').attr('method'),
                url: $('#contact').attr('action'),
                dataType: 'html',
                data: {
                    recaptcha_response: token,
                    nameContact: $('#nameContact').val(),
                    emailContact: $('#emailContact').val(),
                    urlContact: $('#urlContact').val(),
                    messageContact: $('#messageContact').val()
                },
                success: function(response) {
                    $('#nameContact').val('');
                    $('#emailContact').val('');
                    $('#urlContact').val('');
                    $('#messageContact').val('');
                    notification('accept');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    notification('error');
                    console.log('Wyślij błędy na: kontakt@web-hub.pl');
                    console.log(`Błędy: ${textStatus}`);
                    console.log(errorThrown);
                }
             });
            });
        });
     });

    // cookie
    class Cookies {
        setCookie(name, value, days) {
            let expires = '';
            if(days) {
                let dateExpires = new Date();
                dateExpires.setTime(dateExpires.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = `expires = ${dateExpires.toUTCString()}`;
            };
            document.cookie = `${name}=${value}; ${expires}; path=/`;
        };

        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    };

    class PanelCookies extends Cookies {
        constructor() {
            super();
            this.inf = 'Ta strona korzysta z ciasteczek 🍪 aby świadczyć usługi na najwyższym poziomie. Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.';
            this.textBtn = 'Zgoda';

            if(this.getCookie('cookie')) {
                this.hidePanelCookie();
            } else {
                this.setPanelPropertis();
            };
        };

        setPanelPropertis() {
            $('header').before('<div class="cookie"></div>');
            $('.cookie').text(this.inf)
            .append(`<span class="cookie-btn">${this.textBtn}</span>`);
        };

        hidePanelCookie() {
            $('.cookie').animate({
                opacity: 0
            }, 500, function() {
                $(this).css({
                    display: "none"
                });
            });
        };

        setCookie() {
            super.setCookie("cookie", "accept", 30);
            this.hidePanelCookie();
        };
    };

    const panel = new PanelCookies;

    $('.cookie-btn').on("click", (e) => {
        e.preventDefault();
        panel.setCookie();
    });
});


function counter(index) {
    $(index).addClass('animate').each(function() {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 3000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
};

export function notification(type) {
    if(type === 'accept') {
        const notificationAccept = $('<div class="notification notification--accept"><span class="notification--text">Wiadomość została wysłana!</span></div>');
        if($('.notification').length === 0) {
            $('.contact__box').append(notificationAccept);
        };
    } else if(type === 'error') {
        const notificationError = $('<div class="notification notification--error"><span class="notification--text">Wystąpił błąd!</span></div>');
        if($('.notification').length === 0) {
            $('.contact__box, .valuation').append(notificationError);
        };
    };

    $('.notification').css({
        display: "block"
    }).animate({
        opacity: 1
    }, 800, function() {
        $(this).delay(3000).animate({
            opacity: 0
        }, 1000, function() {
            $(this).remove();
        });
    });
};