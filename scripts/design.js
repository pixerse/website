$(document).ready(function() {

    const table = $("table");

    let grBackground, cell, drawing, getColor;

    /** Make grid: This function creat based number of row and column that users enters */
    function makeGrid() {

        const rows = $("#get-height").val(),
        
            cols = $("#get-width").val(),

            grBackground = $("#grBackground").val();

        table.children().remove(); // TODO : Remove the table if it is already created when creating new table.
        
        // TODO : Creat rows based the number that user enter in grid height field.
        for (let r = 1; r <= rows; r++) {

            table.append("<tr class='table-row'></tr>");
        }

        // TODO : Creat columns based the number that user enter in grid width field.
        for (let c = 1; c <= cols; c++) {
            
            $(".table-row").append("<td class='cell'></td>");
        }
      
        /** Set pixels size based the number of rows and columns that user enters to still a square*/
        if (rows <= 40 && cols <= 40) {
          
          $(".table-row").css("height", "20px");
          
          $(".cell").css("width", "20px");
          
        } else if (rows <= 65 && cols <= 65) {
          
          $(".table-row").css("height", "15px");
          
          $(".cell").css("width", "15px");
          
        } else if (rows <= 100 && cols <= 100) {
          
          $(".table-row").css("height", "10px");
          
          $(".cell").css("width", "10px");
          
        } else {
          
          $(".table-row").css("height", "8px");
          
          $(".cell").css("width", "8px");
        }

        table.css("background-color", grBackground); // TODO : Set grid default background.
      
        table.css("border-color", $("#outerBorder").val()); // TODO : Set grid default outer border color.
      
        table.css("border-width", $("#borderWeight").val()); // TODO : Set grid default outer border weight.

        /** Paint the cell based the color that user chooses form color picker */
        drawing = function draw() {

            cell = $(".cell"); // TODO : Define cell variable.

            let mouseOnDown = false; // TODO : Check if the mouse is clicked down or not.

            cell.on("mousemove", function() {

                if(mouseOnDown) { // TODO : Draw constantly if the mouse status clickdown.

                    getColor = $("#grColor").val(); // TODO : Define getColor variable.

                    $(this).css("background-color", getColor);
                    
                }
            });

            cell.on("mousedown", function() {

                mouseOnDown = true; // TODO : Make mouse status true when the mouse clicked down.
            });

            cell.on("mouseup", function() {

                mouseOnDown = false; // TODO : Make the mouse status false when the mouse clicked up.
            });

            cell.click( function() {
              
                getColor = $("#grColor").val(); // TODO : Define getColor variable.
            
                $(this).css("background-color", getColor); // TODO : Draw cell by cell.
            
            });

        };
        drawing();
      
        $(".grid").contextmenu(function(){ return false;}); // TODO : Prevent menu when right click on the grid.

    }

    /** call makeGrid() function when user click creat grid button */
    $("#creat-gr").click(function(e) {

        let rows = $("#get-height").val(),
        
            cols = $("#get-width").val(),

            widthTooltip = $(".width-tooltip"),

            heightTooltip = $(".height-tooltip");

        e.preventDefault(); // TODO : Prevent page reload when you submit the form. 
        
        
        if (cols >= 101) { // TODO : Set columns limit number.

            widthTooltip.fadeIn();

            widthTooltip.css("border-color", "#ff0000");

            widthTooltip.text("Max width 100 colums");

        } else if (rows >= 101) { // TODO : Set Rows limit number.

            heightTooltip.fadeIn();

            heightTooltip.css("border-color", "#ff0000");

            heightTooltip.text("Max height 100 rows");

        } else if (cols < 0) { // TODO : Prevent users to enter columns negative numbers.

            widthTooltip.fadeIn();

            widthTooltip.css("border-color", "#ff0000");

            widthTooltip.text("Enter positive value");

        } else if (rows < 0) { // TODO : Prevent users to enter Rows negative numbers.

            heightTooltip.fadeIn();

            heightTooltip.css("border-color", "#ff0000");

            heightTooltip.text("Enter positive value");

        } else { // TODO : If the number of columns and row between 1 and 100 and not negative execute make grid function.

            $(".gr-features").css("display", "flex");

            makeGrid();

            widthTooltip.fadeOut();

            heightTooltip.fadeOut();

        }

    });

    // TODO : Reset app : Clear table, reset width, height and color fields.
    $(".reset-app").click(function() {

        table.children().remove(); // TODO : Remove table.

        $(".gr-features").css("display", "none");
    });

    /** change color picker default color */
    $(".color").click(function() {

        const mainColor = $(this).css("background-color"), // TODO : Get rgb background for each color

            convertToArray = mainColor.split(" "), // TODO : Convert rgb color to array to get each value alone

            num1 = convertToArray[0], // TODO : Get first element within array

            cut = num1.split("("), // TODO : Convert first element within array to array to get the integer

            r = parseInt(cut[1]), // TODO : Get the red value integer

            g = parseInt(convertToArray[1]), // TODO : Get the green value integer

            b = parseInt(convertToArray[2]), // TODO : Get the blue value integer

            setDefualtColor = "#" + hex(r) + hex(g) + hex(b); // TODO : Produce hex color

        $("#grColor").val(setDefualtColor); // TODO : Set the color that user choose it as color picker default color

        /** This function convert the rgb color to hex color */
        function hex (v) {

            let hex = v.toString(16); // TODO : Convert rgb to hex

            if(v < 16) {

                hex = "0" + hex;
            }

            return hex;
        }
    });

    /** Clear all paints that painted previously */
    $("#clearCanvas").click(function(){

        cell.css("background-color", "transparent");
    });

    /** Custom Grid : Set grid background, outer border color and width, inner grid color */
    $(".open-custom-gr").click(function() {

        $("#customGrid").fadeIn(); // TODO : Show Custom grid features.

        $(".close").click(function() {

            $("#customGrid").fadeOut(); // TODO : Close custom grid features when clicking close button.
        });

        /** Open the submit changes panel to custom grid and submit all changes one time */
        $(".submit-changes").click(function() {

            $(".choose-custom-way").fadeOut(); // TODO : Close choose custom way overlay.

            $(".submit-favorites").css("display", "block"); // TODO : Show submit favorites button.

            $(".submit-favorites").click(function() {

                const grBackground = $("#grBackground").val(),

                outerBorder = $("#outerBorder").val(),

                borderWeight = $("#borderWeight").val(),

                innerGrid = $("#innerGrid").val();

                table.css("background-color", grBackground); // TODO : Change grid background.

                table.css("border-color", outerBorder); // TODO : Change outer grid border color.
            
                table.css("border-width", borderWeight); // TODO : Change outer grid border weight.

                $("tr, td").css("border-color", innerGrid); // TODO : Change inner grid color.
            });

        });

        /** Open live changes panel to custom grid and show effect live */
        $(".live-changes").click(function() {

            $(".choose-custom-way").fadeOut(); // TODO : Close choose custom way overlay.

            /** Change grid background live */
            $("#grBackground").on("change", function() {

                let grBackground = $("#grBackground").val();
        
                table.css("background-color", grBackground); // TODO : Change grid background.
            });
        
            /** Change grid outer border color live */
            $("#outerBorder").on("change", function() {
        
                let outerBorder = $("#outerBorder").val();
        
                table.css("border-color", outerBorder); // TODO : Change outer grid border color.
            });
        
            /** Change grid outer border width live */
            $("#borderWeight").on("change", function() {
        
                let borderWeight = $("#borderWeight").val();
        
                table.css("border-width", borderWeight); // TODO : Change outer grid border weight.
            });
        
            /** Change inner grid color live */
            $("#innerGrid").on("change", function() {
        
                let innerGrid = $("#innerGrid").val();
        
                $("tr, td").css("border-color", innerGrid); // TODO : Change inner grid color.
            });
        });

    });

    /** Hide inner grid when the user toggle grid button */
    function hideGrid() {

        $("tr, td").css("border", "0"); // TODO : Clear inside grid.

        $(this).children().first().remove(); // TODO : Remove the grid icon.

        $(this).attr("title", "Hide Inside Grid"); // TODO : Set title to explain what icon do.

        $(this).append("<i class='material-icons'>&#xE3EC;</i>"); // TODO : Set grid icon instead ungrid icon.

        $(this).one("click", showGrid); // TODO : When click ungrid button one click listening to showGrid function.
    }
    /** Show inner grid when the user toggle grid button */
    function showGrid() {

        let innerGrid = $("#innerGrid").val();

        $("tr, td").css({"border-width": "1px", "border-style": "solid", "border-color": innerGrid}); // TODO : Make inside grid

        $(this).attr("title", "Show Inside Grid"); // TODO : Set title to explain what icon do.

        $(this).children().first().remove(); // TODO : Remove ungrid icone

        $(this).append("<i class='material-icons'>&#xE3EB;</i>"); // TODO : Set ungrid icone instead grid icon.

        $(this).one("click", hideGrid); // TODO : When click grid button one click listening to hideGrid function.
    }
    $("#clearGrid").one("click", hideGrid); // TODO : When click ungrid button listening to hideGrid function.

    /** Active eraser to erase cell(s) background */
    function activeEraser() {

        let mouseOnDown = false;

        /** Erase cell background when mouse move and clicked down */
        cell.on("mousemove", function() {

            if(mouseOnDown) {

                $(this).css("background-color", "transparent");

            }
        });

        /** When mouse is down set value of mouseOnDown to true */
        cell.on("mousedown", function() {

            mouseOnDown = true;
        });

        /** When mouse is up set value of mouseOnDown to false */
        cell.on("mouseup", function() {

            mouseOnDown = false;
        });

        /** Erase Cell by Cell */
        cell.click(function() {

            $(this).css("background-color", "transparent");
        });

        $(this).children().first().remove(); // TODO : Remove Erase cell icon.

        $(this).attr("title", "Active Painter"); // TODO : Set a title to describe what icon do.

        $(this).append("<i class='material-icons'>&#xE3AE;</i>"); // TODO : Set painter icon.

        $(this).one("click", activeDraw); // TODO : when click erase icon one click call activeDrow function.
    }
    /** Active painter to back to draw again */
    function activeDraw() {

        drawing(); // TODO : Call drawing function.

        $(this).children().first().remove(); // TODO : Remove Painter icon. 

        $(this).attr("title", "Active Eraser"); // TODO : Set a title to describe what icon do.

        $(this).append("<i class='material-icons'>&#xE53C;</i>"); // TODO : Set eraser icon.

        $(this).one("click", activeEraser); // TODO : when click painter icon one click call activeEraser function.
    }
    $("#clearCell").one("click", activeEraser); // TODO : when click erase icon one click call activeEraser function.

});