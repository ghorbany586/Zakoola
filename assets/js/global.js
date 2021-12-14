(function ($) {
    'use strict';

    function goToNextInput(e) {
        var key = e.which,
            t = $(e.target),
            sib = t.next('input');

        if (key != 9 && (key < 48 || key > 57)) {
            e.preventDefault();
            return false;
        }

        if (key === 9) {
            return true;
        }

        if (!sib || !sib.length) {
            sib = $('body').find('input').eq(0);
        }
        sib.select().focus();
    }

    function onKeyDown(e) {
        var key = e.which;

        if (key === 9 || (key >= 48 && key <= 57)) {
            return true;
        }

        e.preventDefault();
        return false;
    }

    function onFocus(e) {
        $(e.target).select();
    }

    $.fn.countTo = function (options) {
        return this.each(function () {
            var FRAME_RATE = 60;
            var $el = $(this);
            var countFrom = parseInt($el.attr('data-count-from'));
            var countTo = parseInt($el.attr('data-count-to'));
            var countSpeed = $el.attr('data-count-speed');
            var rafId;
            var increment;
            var currentCount = countFrom;
            var countAction = function () {
                if (currentCount < countTo) {
                    $el.text(Math.floor(currentCount));
                    increment = countSpeed / FRAME_RATE;
                    currentCount += increment;
                    rafId = requestAnimationFrame(countAction);
                } else {
                    $el.text(countTo);
                }
            };
            rafId = requestAnimationFrame(countAction);
        });
    };

    $.fn.jmspinner = function (value) {
        let small = 'small';
        let custom = 'custom';
        let large = 'large';
        let div_bounces = '';
        let div = document.createElement('div');
        let plc = $(div).prop('class', 'spin_loading');
        let inner = document.createElement('div');
        let center_loading = $(inner).prop('class', 'spinner');
        let made = $(plc).html(center_loading);
        let bce1 = document.createElement('div');
        let bce2 = document.createElement('div');
        let bce3 = document.createElement('div');
        let div_btn_1 = $(bce1).prop('class', 'bounce1');
        let div_btn_2 = $(bce2).prop('class', 'bounce2');
        let div_btn_3 = $(bce3).prop('class', 'bounce3');
        // returning the bounce divs to the template

        //let div_inner_bounces = $(div_bounces).html(div_btn);
        let divs_bts;
        let index = 0;
        let loading = [];
        loading.push(div_btn_1, div_btn_2, div_btn_3);


        $.each(loading, function (i, index) {

            divs_bts = $(center_loading).append(index);

        });

        if (value == 'small') {
            let small = $(divs_bts).addClass('small');
            this.html(small);
            return this;
        }
        if (value == 'large') {
            let large = $(divs_bts).addClass('large');
            this.html(large);
            return this;
        }
        if (value == null) {
            let detf = $(divs_bts).addClass('default');
            this.html(detf);
            return this;
        }

        if (value == false) {
            this.find('.spinner').remove();
            return this;
        }


    };

    $(document).ready(function () {

        $('.number-counter').countTo();

        if ($(document).width() > 992) {
            new Swiper('.reviews .swiper-container', {
                direction: 'vertical',
                effect: 'coverflow',
                slidesPerView: 1,
                centeredSlides: false,
                spaceBetween: -240,
                autoplay: {
                    delay: 3580,
                    disableOnInteraction: false
                },
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 350,
                    modifier: 1,
                    slideShadows: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            });
        } else {
            new Swiper('.reviews .swiper-container', {
                slidesPerView: 1,
                centeredSlides: false,
                spaceBetween: 15,
                autoplay: {
                    delay: 3580,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            });
        }

        $(document).on('click', 'ul .icon-close', function () {
            $('header ul').animate({
                right: "-100%"
            });
        });

        // Responsive Header
        $(document).on('click', '.btn-menu', function (e) {
            e.stopPropagation();
            $('header ul').animate({
                right: "0px"
            });
        });

        // progress bars
        let progress = $('.custom-progress');
        progress.each(function () {
            let color = $(this).data('color');
            let percent = $(this).data('percent');
            let bar = new ProgressBar.SemiCircle(this, {
                color: color,
                trailColor: '#e9e9e9',
                strokeWidth: 6,
                trailWidth: 6,
                easing: 'easeInOut',
                duration: 1400,
                svgStyle: null,
                text: {
                    value: '',
                    alignToBottom: false
                },
                from: {color: color},
                to: {color: color},
                // Set default step function for all animate calls
                step: (state, bar) => {
                    bar.path.setAttribute('stroke', state.color);
                    bar.path.setAttribute('stroke-linecap', 'round');
                    var value = Math.round(bar.value() * 100);
                    bar.setText(value + " %");

                    bar.text.style.color = '#000';
                }
            });
            bar.text.style.fontFamily = '"YekanBakh-bold", Helvetica, sans-serif';
            bar.text.style.fontSize = '2rem';
            bar.animate(percent / 100);  // Number from 0.0 to 1.0
        });
        let circle_progress = $('.circle-progress');
        circle_progress.each(function () {
            let color = $(this).data('color');
            let percent = $(this).data('percent');
            let text = $(this).data('text');
            var bar = new ProgressBar.Circle(this, {
                color: color,
                trailColor: '#e9e9e9',
                strokeWidth: 6,
                trailWidth: 6,
                easing: 'easeInOut',
                duration: 1400,
                svgStyle: null,
                text: {
                    value: '',
                    alignToBottom: false
                },
                from: {color: color, width: 6},
                to: {color: color, width: 6},
                // Set default step function for all animate calls
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
                    circle.path.setAttribute('stroke-linecap', 'round');

                    var value = Math.round(circle.value() * 100);
                    circle.setText("<span class='text'>"+ text +"</span> %" + value);

                    circle.text.style.color = '#000';

                }
            });
            bar.text.style.fontFamily = '"YekanBakh-bold", Helvetica, sans-serif';
            bar.text.style.fontSize = '24px';
            bar.animate(percent / 100);  // Number from 0.0 to 1.0
        });

        // Stars
        $('.rate.stars:not(.active) .selected-star > i').hover(function () {
            $(this).parent().remove();
        });
        $('.rate.stars:not(.active) > i').hover(function () {
            let elm = $(this);
            elm.parent().parent().find('.selected-star').remove();
            let current_star = elm.index();
            elm.parent().find('i').each(function (index) {
                if (current_star >= index) {
                    $(this).removeClass('icon-star-empty').addClass('icon-star-fill');
                } else {
                    $(this).removeClass('icon-star-fill').addClass('icon-star-empty');
                }
            });
        });
        $('.rate.stars.no-action').mouseleave(function () {
            let elm = $(this);
            elm.find('i').each(function () {
                $(this).removeClass('icon-star-fill').addClass('icon-star-empty');
            });
        });
        $('.rate.stars > i').on('click', function () {
            let elm = $(this);
            let rate = elm.index();
            let recordElm = elm.parent().parent().find('.rate.stars');
            let model = $('#model').attr('content');
            let token = $('#token').attr('content');
            let model_id = recordElm.parent().find('.model_id').attr('content');
            recordElm.jmspinner('large');
            // $.ajax({
            //     url: '/rate/log',
            //     type: 'POST',
            //     data: {
            //         _token: token,
            //         model: model,
            //         model_id: model_id,
            //         rate: (parseInt(rate) + 1),
            //     },
            //     dataType: 'JSON',
            //     success: function () {
            //         setTimeout(function(){window.location.href = window.location.href;}, 250);
            //     }
            // });
        });

        // verify-input Events
        $(document).on('keyup', '.verify-input', goToNextInput);
        $(document).on('keydown', '.verify-input', onKeyDown);
        $(document).on('click', '.verify-input', onFocus);
    });

})(jQuery);