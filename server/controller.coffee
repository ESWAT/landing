
Promise   = require 'bluebird'
validator = require 'validator'


module.exports = ({postmark}) ->

    sanitize = (info) ->
        Object.keys(info).reduce ((result, key) ->
            result[key] = validator.escape info[key]
            return result
        ), {}


    compile = (info) ->
        info = sanitize(info)
        """
        <h1>Hi there! How are you?</h1>
        <p>This person would like a demo of our product!</p>
        <table>
            <tbody>
                <tr>
                    <td><b>Name</b></td>
                    <td>#{info.firstName} #{info.lastName}</td>
                </tr>
                <tr>
                    <td><b>Email</b></td>
                    <td>#{info.email}</td>
                </tr>
                <tr>
                    <td><b>Phone</b></td>
                    <td>#{info.phone}</td>
                </tr>
                <tr>
                    <td><b>Company</b></td>
                    <td>#{info.company}</td>
                </tr>
            </tbody>
        </table>
        """


    send = ({from, to, subject, body}) ->
        deferred = Promise.defer()
        postmark.send {From:from, To:to, Subject:subject, TextBody:body}, (err) ->
            return deferred.reject err if err
            return deferred.resolve()
        return deferred


    sendDemoRequest: (info) ->
        return send
            from:    info.email
            to:      "nick@42debut.com"
            subject: "[42 Demo Request] #{info.firstName} #{info.lastName} from #{info.company} wants a demo!"
            body:    compile(info)
