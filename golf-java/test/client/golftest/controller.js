
// import namespaces
eval($.Import("Component.com.thinkminimo.golf.test.Harness"));

// this is the default action name, in case no action was specified
$.golf.defaultRoute = "/tests/foo/bar/";

// this defines the golf controller
$.golf.controller = [

  // action for the /test/something/ routes
  { route:  "^/tests/([^/]+)/([^/]+)/$",
    action: (function() {
      var t = new Harness();

      return function(b, match) {
        b.empty().append(t);

        t.test("route regexps", function() {
            return match[1] == "foo" && match[2] == "bar";
        });

        (function(tmp) {
          t.wait(tmp);
          $("form.test1").submit(function() {
            t.assert(
              $("[name='typeyes']").val() == "typedy type" &&
              $("[name='txtarea']").val() == "this man is not to be trusted" &&
              $("[name='selection']").val() == "lizards",
              tmp);
            $("input[type='submit']").val("Thanks!").attr("disabled", "true");
            return false;
          });
        })(t.test(
          "<form class='test1'>"+
            "<table class='formtable'>"+
            "<colgroup>"+
              "<col width='20%'/>"+
              "<col width='80%'/>"+
            "</colgroup>"+
            "<thead></thead>"+
            "<tbody>"+
              "<tr>"+
                "<td>one: </td>"+
                "<td>"+
                  "<input type='text' class='text' name='typeyes' "+
                    "value='typedy type' disabled='yes'/>"+
                "</td>"+
              "</tr><tr>"+
                "<td>two: </td>"+
                "<td>"+
                  "<textarea rows='5' name='txtarea' disabled='yes'>"+
                    "this man is not to be trusted"+
                  "</textarea>"+
                "</td>"+
              "</tr><tr>"+
              "<td>three: </td>"+
              "<td>"+
                "<select name='selection' disabled='yes'>"+
                  "<option value='cats'>Cats</option>"+
                  "<option value='dogs'>Dogs</option>"+
                  "<option value='lizards' selected='selected'>"+
                    "lizards"+
                  "</option>"+
                "</select>"+
              "</td>"+
              "</tr><tr>"+
                "<td></td>"+
                "<td>"+
                  "<input type='submit' class='submit' value='Click me!'/>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "</table>"+
          "</form>"
        ));

        t.test("head.html");

        t.test("constructor argv", (match[1] == "foo" && match[2] == "bar"));

        (function(tmp) {
          $.get("?path=controller.js", function(data) {
            t.assert(data.length > 10, tmp);
          });
        })(t.test("AJAX GET"));

        t.test("AJAX POST");

        t.test("AJAX PUT");

        t.test("AJAX DELETE");

        (function(tmp) {
          // flickr.com api url
          var url = "http://api.flickr.com/services/feeds/photos_public.gne"+
                      "?tags=dogs&tagmode=any&format=json&jsoncallback=?";
          t.fail(tmp);
          $.getJSON(url, function(data) {
            if (!data.items || data.items.length == 0)
              t.error(tmp);
            else
              t.pass(tmp);
          });
        })(t.test("JSONP GET"));

        (function(tmp) {
          $.get($.golf.res.test["test.html"], function(data) {
            t.assert(data == "PASS\n");
          });
        })(t.test("$.golf.res object"));

        t.test("$.component.res object");
        /*
        $.get($.component.res.test["test.html"], function(data) {
          t.assert(data == "PASS\n");
        });
        */
        return false;
      };
    })()
  },

  // the default action
  { route:  ".*",
    action: function(b, match) {
      $.golf.location($.golf.defaultRoute);
    }
  }

];
