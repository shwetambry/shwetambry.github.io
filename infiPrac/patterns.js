
class Patterns {
  correct = [false];
  num; inc; miss;
  incArray = [1, 2, 3, 4, 5, 10];
  fwd = true;
  feedback = "";

  getCorrect() {
    return this.correct;
  }
  reset() {
    for (var i = 0; i < 5; i++) {
      $("#" + i).val("");
      $("#" + i).prop("readOnly", true);

    }
  }
  setUp() {
    this.reset();
    this.num = Math.floor(Math.random() * 100) + 1;
    if (cur_prime_id == "lvl2") {
      this.inc = this.incArray[Math.floor(Math.random() * this.incArray.length)];
    } else if (cur_prime_id == "lvl0") {
      this.inc = 1;
    }

    this.miss = Math.floor(Math.random() * 5);
    var tmp = Math.floor(Math.random() * 2);
    if (tmp == 0) {
      this.fwd = false;
    } else {
      this.fwd = true;
    }
    for (var i = 0; i < this.miss; i++) {
      if (this.fwd == true) {
        $("#" + i).val(this.num + i * this.inc);
      } else {
        $("#" + i).val(this.num + (4 - i) * this.inc);
      }
    }
    $("#" + this.miss).val("");
    for (var i = this.miss + 1; i < 5; i++) {
      if (this.fwd == true) {
        $("#" + i).val(this.num + i * this.inc);
      } else {
        $("#" + i).val(this.num + (4 - i) * this.inc);
      }
    }
    $("#" + this.miss).prop("readOnly", false);
    $("#" + this.miss).focus();

  }

  check() {
    this.attempt += 1;
    var inp = $("#" + this.miss).val();
    var correctAns;
    if (this.fwd == true) {
      correctAns = this.num + this.miss * this.inc;
    } else {
      correctAns = this.num + (4 - this.miss) * this.inc;
    }
    if (inp == correctAns) {
      $("#" + this.miss).css("background-color", "green");
      this.feedback = "Good job!!! Correct Answer!!!!";
      this.correct[0] = true;
    } else {
      $("#" + this.miss).css("background-color", "red");
      this.feedback = "<p>Incorrect Answer.</p><p> The correct answer is " + correctAns;
      this.feedback += ".</p> <p> Numbers are ";
      if (this.fwd == true) {
        this.feedback += "increasing by " + this.inc + "</p>";
      } else {
        this.feedback += "decreasing by " + this.inc + "</p>";
      }
    }
  }
  getfeedbackText() {
    return this.feedback;
  }
}

// helping functions
