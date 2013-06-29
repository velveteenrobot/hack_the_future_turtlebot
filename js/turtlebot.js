// Load main.css
function load_main_css() {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", "/css/main.css");
    document.getElementsByTagName("head")[0].appendChild(fileref);

    fileref.onreadystatechange = load_norm_css;
    fileref.onload = load_norm_css;
}

// Load normalize.css
function load_norm_css() {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", "/css/normalize.css");
    document.getElementsByTagName("head")[0].appendChild(fileref);

    fileref.onreadystatechange = load_eventemitter2;
    fileref.onload = load_eventemitter2;
}

// Load eventemitter2
function load_eventemitter2() {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", "/js/vendor/eventemitter2.min.js");
    document.getElementsByTagName("head")[0].appendChild(fileref);

    fileref.onreadystatechange = load_roslib;
    fileref.onload = load_roslib;
}

// Load roslib
function load_roslib() {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", "/js/vendor/roslib.min.js");
    document.getElementsByTagName("head")[0].appendChild(fileref);

    fileref.onreadystatechange = load_robot;
    fileref.onload = load_robot;
}

// Global robot variable
var robot = {};

// Setup the robot
function load_robot() {
    // Create ROS context
    robot._ros = new ROSLIB.Ros({url : 'ws://' + location.host + ':9090'});

    // Create cmd_vel publisher
    robot._cmd_vel_publisher = new ROSLIB.Topic({
        ros : robot._ros,
        name : '/mobile_base/commands/velocity',
        messageType : 'geometry_msgs/Twist'
    });

    // Function to move the turtlebot
    robot.move = function (linear, angular) {
        console.log('Moving robot: [' + linear + ', ' + angular + ']');
        var twist = new ROSLIB.Message({
            linear : {
                x : linear,
                y : 0,
                z : 0
            },
            angular : {
                x : 0,
                y : 0,
                z : angular
            }
        });
        robot._cmd_vel_publisher.publish(twist);
    };

    // Function to stop the turtlebot
    robot.stop = function () {
        console.log('Stopping robot...');
        robot.move(0, 0);
    };

    // Run user's code
    if (robot.onload !== undefined) {
        robot.onload();
    } else {
        alert('You should put your code in a function and set it to robot.onload!');
    }
}

// Start the loading sequence
load_main_css();
