// ==UserScript==
// @name         AutoScavenge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  It does scavenges automatically and also unlock them when possible.
// @author       MEMEN
// @match        https://*.guerrastribales.es/*&screen=place&mode=scavenge
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function(){
        var enable = 0
        var lock = 0
        for(var option in ScavengeScreen.village.options){
            var recolection = ScavengeScreen.village.options[option]
            enable += recolection.scavenging_squad == null
            lock += recolection.is_locked
        }

        enable -= lock

        if(enable){
            for(var key in ScavengeScreen.village.unit_counts_home){
                if(key != "knight") $("input.unitsInput[name='" + key + "']").val(ScavengeScreen.village.unit_counts_home[key] / enable).trigger("change")
            }
            $("a.free_send_button").click()
        }

        for(option in ScavengeScreen.village.options){
            recolection = ScavengeScreen.village.options[option]
            unlockable = true

            if(recolection.is_locked){
                for(key in ScavengeScreen.village.res){
                    if(recolection.is_locked && ScavengeScreen.village.res[key] < recolection.base.unlock_cost[key]){
                        unlockable = false
                    }
                }

                if(unlockable){
                    break
                }
            }
        }

        if(unlockable){
            $("a.unlock-button").first().click()
            $("a.btn-default").last().click()
        }
    }, 10000)
})();
