
package com.mettille_web;

import jakarta.servlet.http.*;

import org.springframework.web.bind.annotation.*;

import dbUtils.*;
import model.webUser.StringData;
import view.WebUserView;

@RestController
public class SessionController {

    @RequestMapping(value = "/logonAPI", params = {"email", "password"}, produces = "application/json")
    public String logonAPI(@RequestParam("email") String email,
                           @RequestParam("password") String password,
                           HttpServletRequest request) {

        HttpSession session = request.getSession();
        StringData userData = new StringData();

        try {
            DbConn dbc = new DbConn();

            // Reuse method that validates credentials and fetches user data
            userData = WebUserView.findByEmailAndPassword(email, password, dbc);

            if (userData.errorMsg.length() == 0) {
                // valid user, save in session
                session.setAttribute("loggedOnUser", userData);
            } else {
                // invalid credentials
                session.invalidate();
            }

            dbc.close();
        } catch (Exception e) {
            userData.errorMsg = "Database connection error: " + e.getMessage();
        }

        return Json.toJson(userData);
    }

    @RequestMapping(value = "/getProfileAPI", produces = "application/json")
    public String getProfileAPI(HttpServletRequest request) {
        HttpSession session = request.getSession();
        StringData sd = new StringData();

        if (session.getAttribute("loggedOnUser") != null) {
            sd = (StringData) session.getAttribute("loggedOnUser");
        } else {
            sd.errorMsg = "No user logged on.";
        }

        return Json.toJson(sd);
    }

    @RequestMapping(value = "/logoffAPI", produces = "application/json")
    public String logoffAPI(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();

        StringData sd = new StringData();
        sd.errorMsg = "User has been logged off.";
        return Json.toJson(sd);
    }
}


