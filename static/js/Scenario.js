class DemoControl {
    constructor(){
    }
    // select_scenario(key){
    //     this.scenario = new Scenario(key);
    // }
    begin_scenario(){
        this.scenario = new Scenario();
    }
    dc_reverse(){
        this.scenario.reverse();
    }
    dc_release(){
        this.scenario.release_aboa();
    }
    dc_gear(new_gear){
        this.scenario.change_gear(new_gear);
    }
    sc_place_object_wz(){
        this.scenario.place_object_wz();
    }
    sc_place_object_sz(){
        this.scenario.place_object_sz();
    }
    sc_remove_object(){
        this.scenario.remove_object();
    }
}

class Scenario {
    constructor(){
        this.animation_box_size = [600,200];
        this.car = new Car(this.animation_box_size[0]-110,this.animation_box_size[1]/2);
        // console.log("Scenario: "+key);
        // this.is_object = true;
        // this.object_pos = this.car.get_pos_in_warning_zone()
        this.#draw_scenario();
    }
    reverse(){
        // const dist = 5;
        const that = this;
        let id = null;
        id = setInterval(reverse_inner,50)

        function reverse_inner() {
            const dist = -5;
            const new_last_pos = that.car.get_last_pos() + dist;
            // console.log('new_last_pos: '+new_last_pos);
            if (new_last_pos > 0){
                that.car.sense_things(that.is_object,that.object_pos);
                const is_moving = that.car.move();
                that.#draw_car();
                that.#draw_driver_indicators();

                if (!is_moving){clearInterval(id);}
            } else {
                clearInterval(id);
            }
          }
    }
    change_gear(new_gear){
        this.car.change_gear(new_gear);
        this.car.sense_things(this.is_object,this.object_pos);
        this.#draw_driver_indicators();
    }

    place_object_wz(){
        this.is_object = true;
        this.object_pos = this.car.get_pos_in_warning_zone()
        this.car.sense_things(this.is_object,this.object_pos);
        this.#draw_scenario();
    }
    place_object_sz(){
        this.is_object = true;
        this.object_pos = this.car.get_pos_in_safety_zone()
        this.car.sense_things(this.is_object,this.object_pos);
        this.#draw_scenario();
    }
    remove_object(){
        this.is_object = false;
        this.#draw_scenario();
    }
    release_aboa(){
        this.car.speed = 0;
        this.car.is_aboa_intervention = false;
        this.car.sense_things(this.is_object,this.object_pos);
        this.#draw_driver_indicators();
    }


    #draw_scenario(){
        var inner_html = "";
        // inner_html += "<div class=row id='indicators'>"+this.#get_driver_indicators()+"</div>";
        inner_html += "<div class=row id='indicators'></div>";
        inner_html += "<div class=row id='animation'>"+this.#get_animation_box_html()+"</div>";
        document.getElementById("draw_space").innerHTML = inner_html;

        const dom_box = document.getElementById("animation_box");
        dom_box.style.width = this.animation_box_size[0] + "px"; 
        dom_box.style.height = this.animation_box_size[1] + "px";

        this.#draw_car()
        this.#draw_driver_indicators()

        if (this.is_object){
            const dom_object = document.getElementById("object");
            dom_object.style.left = this.object_pos[0] + "px"; 
            dom_object.style.top = this.object_pos[1] + "px";
            console.log('object_pos: '+ this.object_pos)
        }
    }
    #draw_driver_indicators(){
        var inner_html = "";
        inner_html += this.#get_driver_indicators();

        document.getElementById("indicators").innerHTML = inner_html;

        const dom_alert_ind = document.getElementById("alert_indicator");
        var color = 'gray';
        if (this.car.pbas_alert_is_on){color='orange'}
        dom_alert_ind.style.color = color

        const dom_pbas_ind = document.getElementById("pbas_indicator");
        color = 'gray';
        if (this.car.is_pbas_on){color='green'}
        dom_pbas_ind.style.color = color

        const dom_aboa_ind = document.getElementById("aboa_indicator");
        color = 'gray';
        if (this.car.is_aboa_on){color='green'}
        dom_aboa_ind.style.color = color

        const dom_aboa_eng_ind = document.getElementById("aboa_engage_indicator");
        color = 'gray';
        if (this.car.is_aboa_intervention){color='green'}
        dom_aboa_eng_ind.style.color = color

        const dom_cam_ind = document.getElementById("cam_indicator");
        color = 'gray';
        if (this.car.cam_is_on){color='green'}
        dom_cam_ind.style.color = color

    }
    #draw_car(){
        const dom_car = document.getElementById("car");
        dom_car.style.width = this.car.width + "px";
        dom_car.style.left = this.car.x_pos + "px"; 
        dom_car.style.top = this.car.y_pos + "px";

        const dom_wz = document.getElementById("warning_zone");
        const wz_pos = this.car.get_warning_zone_pos()
        dom_wz.style.width = wz_pos[2] + "px"; 
        dom_wz.style.height = this.car.z_height + "px";
        dom_wz.style.left = wz_pos[0] + "px"; 
        dom_wz.style.top = wz_pos[1] + "px";

        const dom_sz = document.getElementById("safety_zone");
        const sz_pos = this.car.get_safety_zone_pos()
        dom_sz.style.width = sz_pos[2] + "px"; 
        dom_sz.style.height = this.car.z_height + "px";
        dom_sz.style.left = sz_pos[0] + "px"; 
        dom_sz.style.top = sz_pos[1] + "px";
    }
    #get_animation_box_html(){
        var inner_html = "<div id='animation_box'>";
        inner_html += "text animation box";
        // inner_html += "<div id ='car'><img id='car_img' src='/static/img/car.png'></div>";
        inner_html += "<img id='car' src='/static/img/car.png'>";
        inner_html += "<div id ='warning_zone'></div>";
        inner_html += "<div id ='safety_zone'></div>";
        if (this.is_object){
            inner_html += "<div id='object'></div>";
        }
        inner_html += "</div>"; // close box div
        return (inner_html)
    }
    #get_driver_indicators(){
        var inner_html = "";
        // var inner_html = "<div id='indicators'>";
        inner_html += "<div class='container col-sm-6'>";
        inner_html += "Gear: "+this.car.gear;
        inner_html += "</br>";
        // inner_html += "</div>"; // close col 1
        // inner_html += "<div class='container col-sm-4'>";
        inner_html += "PBAS Enabled Status: ";
        inner_html += "<i id='pbas_indicator' class='bi bi-circle-fill style='color:#03A9F4; font-size:12px;></i>";
        inner_html += "</br>";
        inner_html += "ABOA Enabled Status: ";
        inner_html += "<i id='aboa_indicator' class='bi bi-circle-fill style='color:#03A9F4; font-size:12px;></i>";
        inner_html += "</br>";
        inner_html += "ABOA Engaged Status: ";
        inner_html += "<i id='aboa_engage_indicator' class='bi bi-circle-fill style='color:#03A9F4; font-size:12px;></i>";
        // inner_html += "</br>";
        inner_html += "</div>"; // close col 2
        inner_html += "<div class='container col-sm-6'>";
        // inner_html += "<i id='aboa_indicator' class='bi bi-circle-fill style='color:#03A9F4; font-size:12px;></i>";
        inner_html += "Camera Display: ";
        inner_html += "<i id='cam_indicator' class='bi bi-circle-fill style='color:#03A9F4; font-size:12px;></i>";
        inner_html += "</br>";
        inner_html += "Audible Alert: ";
        inner_html += "<i id='alert_indicator' class='bi bi-circle-fill style='color:#03A9F4; font-size:12px;></i>";
        inner_html += " (orange=sound)";
        inner_html += "</div>"; // close col 3

        // inner_html += "</div>"; // close indicators

        return (inner_html)
    }

}

class Car {
    constructor(initial_x,initial_y){
        this.speed = 0
        this.width = 100;
        this.wz_width = 200;
        this.sz_width = 50;
        this.z_height = 40;
        this.gear = "Park";
        this.is_aboa_on = false;
        this.cam_is_on = false;
        this.pbas_alert_is_on = false;
        this.aboa_is_manuall_off = false;
        this.is_low_traction = false;
        this.is_low_speed = true;
        this.is_sensor_working = true;
        this.x_pos = initial_x;
        this.y_pos = initial_y;
        this.is_aboa_intervention = false;
        this.is_pbas_on = false;

        console.log("I made a car!");
    }
    change_gear(new_gear){
        if (new_gear == 'Park' || new_gear == "Reverse"){this.gear = new_gear}

        if (this.gear == 'Reverse'){
            this.is_pbas_on = true;
            this.cam_is_on = true;
        } else {
            this.is_pbas_on = false;
            this.cam_is_on = false;
        }

        this.#try_enable_aboa();
    }
    move(){
        let can_move = (this.gear != 'Park')
        if (can_move){
            if (this.is_aboa_intervention){
                this.speed -= 5;
                if (this.speed<0){
                    this.speed=0;
                    can_move = false;
                }
                console.log('speed: '+this.speed)
                this.x_pos -= this.speed;
                this.y_pos += this.speed/2;

            } else {
                this.speed += 1;
                this.x_pos -= this.speed;
            }
        }
        return(can_move)
    }
    get_last_pos(){
        const x = this.x_pos-this.wz_width-this.sz_width-10;
        return(x)
    }
    get_warning_zone_pos(){
        const x = this.x_pos-this.sz_width-this.wz_width;
        // const x = this.x_pos-this.width;
        const y = this.y_pos;
        const width = this.wz_width;
        return([x,y,width])
    }
    get_safety_zone_pos(){
        // const x = this.x_pos-this.width-this.wz_width;
        const x = this.x_pos-this.sz_width;
        const y = this.y_pos;
        const width = this.sz_width;
        return([x,y,width])
    }
    get_pos_in_warning_zone(){
        const x = this.x_pos-this.sz_width-(this.wz_width/2)-10;
        // const x = this.x_pos-this.width;
        const y = this.y_pos+(this.z_height/2)-10;
        return([x,y])
    }
    get_pos_in_safety_zone(){
        const x = this.x_pos-(this.sz_width/2)-10;
        // const x = this.x_pos-this.width;
        const y = this.y_pos+(this.z_height/2)-10;
        return([x,y])
    }
    #try_enable_aboa(){
        if (this.gear == 'Reverse'
            && !this.aboa_is_manuall_off
            && this.is_low_speed
            && !this.is_low_traction
            && this.is_sensor_working
        ){
            this.is_aboa_on = true;
        } else {
            this.is_aboa_on = false;
        }
    }
    sense_things(is_object,object_pos){
        this.#try_enable_aboa();
        if (this.is_pbas_on && this.is_sensor_working && is_object){
            if (this.#is_obj_in_wz(object_pos)){
                this.pbas_alert_is_on = true;
            }
            if (this.#is_obj_in_sz(object_pos)){
                this.pbas_alert_is_on = true;
                if (this.is_aboa_on){this.is_aboa_intervention = true;}
                
            }

        }
    }
    #is_obj_in_wz(object_pos){
        const x = object_pos[0];
        const y = object_pos[1];
        const wz_begin = this.x_pos-this.sz_width;
        const wz_end = wz_begin-this.wz_width;

        let is_in_wz = (x <= wz_begin && x > wz_end)
        is_in_wz = is_in_wz || (y >= this.y_pos && y <= this.y_pos+this.z_width)
        // console.log('In WZ: '+is_in_wz);
        return(is_in_wz)
    }
    #is_obj_in_sz(object_pos){
        const x = object_pos[0];
        const y = object_pos[1];
        const sz_begin = this.x_pos;
        const sz_end = sz_begin-this.sz_width;

        let is_in_sz = (x <= sz_begin && x > sz_end)
        is_in_sz = is_in_sz || (y >= this.y_pos && y <= this.y_pos+this.z_width)
        // console.log('In SZ: '+is_in_sz);
        return(is_in_sz)
    }
}