class Review {
    constructor() {
        this.reviewArr = [];
    };


    collectReviewItems() {
        $.get({
            url: './list.json',
            dataType: 'json',
            context: this,
            success: function (data) {
                this.reviewArr = data.review;

                console.log(this.reviewArr);
            }

        });

    }


    render(root) {

        console.log(this.reviewArr)

        for (let itemKey = 0; itemKey < this.reviewArr.length; itemKey++) {

            let itemDiv = $('<div />', {
                id: 'review_' + this.reviewArr[itemKey].id,
                class: 'review_item'
            });


            itemDiv.appendTo(root);
        }

    }


}

$(document).ready(function () {

    let review = new Review();
    review.collectReviewItems();
    review.render('#review_container');

});