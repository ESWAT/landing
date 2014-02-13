
Promise   = require 'bluebird'
{swagger} = require 'service'


module.exports = ({controller}) ->

    sendDemoRequest:
        spec:
            description: "Create new demo request."
            method:  "POST"
            path:    "/demo/request"
            notes:   ""
            params: [
                swagger.bodyParam("first_name")
                swagger.bodyParam("last_name")
                swagger.bodyParam("company")
                swagger.bodyParam("phone")
                swagger.bodyParam("email")
            ]
            errorResponses: [
            ]
        action: (req) ->
            console.log JSON.stringify(req.params, null, 2)

            info =
                firstName: req.params.firstName
                lastName:  req.params.lastName
                company:   req.params.company
                phone:     req.params.phone
                email:     req.params.email

            console.log "--> received demo request from:"
            console.log JSON.stringify(info, null, 2)

            controller.sendDemoRequest(info)
            .then ->
                console.log "--> demo request from `#{info.email}` sent successfully."
            .catch (error) ->
                console.error "--> error sending demo request from `#{info.email}`:"
                console.error error

            return Promise.cast()

