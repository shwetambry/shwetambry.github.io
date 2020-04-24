class Variable {
    correct = [false];
    feedback = "";
    left; right; missIdx;
    numArr = [];
    signArr = [];

    getCorrect() {
        return this.correct;
    }
    getfeedbackText() {
        return this.feedback;
    }
    reset() {
        this.numArr = [];
        this.signArr = [];
        this.feedback = "";
    }
    setUp() {
        this.reset();
        this.setNumSignArrays();
        var equation = "";

        if (this.missIdx < this.left) {
            for (var i = 0; i < this.missIdx; i++) {
                equation += this.numArr[i] + " " + this.signArr[i] + " ";
            }
            equation += "X";
            for (var i = this.missIdx + 1; i < this.left; i++) {
                equation += " " + this.signArr[i - 1] + " " + this.numArr[i];
            }
            equation += " = ";
            for (var i = this.left; i < this.left + this.right - 1; i++) {
                equation += this.numArr[i] + " " + this.signArr[i - 1] + " ";
            }
            equation += this.numArr[this.left + this.right - 1];
        } else {
            for (var i = 0; i < this.left - 1; i++) {
                equation += this.numArr[i] + " " + this.signArr[i] + " ";
            }
            equation += this.numArr[this.left - 1] + " = ";
            for (var i = this.left; i < this.missIdx; i++) {
                equation += this.numArr[i] + " " + this.signArr[i - 1] + " ";
            }
            equation += "X";
            for (var i = this.missIdx + 1; i < this.left + this.right; i++) {
                equation += " " + this.signArr[this.left + this.right - i - 1] + " " + this.numArr[i];
            }
        }
        $("#missingProb").html(equation);
        $("#variable-input").focus();
    }

    check() {
        var inp = $("#variable-input").val();
        if (inp == this.numArr[this.missIdx]) {
            this.correct[0] = true;
            $("#variable-input").css("background-color", "green");
            this.feedback = "Good job!!! Correct Answer!!!!";
        } else {
            $("#variable-input").css("background-color", "red");
            this.feedback =
                "<p>Incorrect Answer.</p><p> The correct answer is " + this.numArr[this.missIdx];
        }
    }
    setNumSignArrays() {
        this.left = Math.floor(Math.random() * 2) + 1;
        this.right = Math.floor(Math.random() * 2) + 1;
        this.missIdx = Math.floor(Math.random() * (this.left + this.right));
        var num1left = Math.floor(Math.random() * 70) + 10;
        this.numArr.push(num1left);
        var leftSum = num1left;
        if (this.left > 1) {
            var rndSign = Math.floor(Math.random() * 2);
            if (rndSign == 0) {
                var num2left = Math.floor(Math.random() * 50) + 10;
                leftSum = num1left + num2left;
                this.signArr.push("+");
            } else {
                num2left = Math.floor(Math.random() * num1left);
                leftSum = num1left - num2left;
                this.signArr.push("-");
            }
            this.numArr.push(num2left);
        }
        var num1right;
        if (this.right == 1) {
            num1right = leftSum;
            this.numArr.push(num1right);
        } else {
            var num2right;
            var rightSum;
            num1right = Math.floor(Math.random() * 70) + 10;
            rightSum = num1right;
            this.numArr.push(num1right);
            if (leftSum < rightSum) {
                this.signArr.push("-");
                num2right = rightSum - leftSum;
            } else if (leftSum > rightSum) {
                this.signArr.push("+");
                num2right = leftSum - rightSum;
            }
            this.numArr.push(num2right);
        }
    }
}