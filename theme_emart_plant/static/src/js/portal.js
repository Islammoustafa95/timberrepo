/** @odoo-module */

	import { rpc } from "@web/core/network/rpc";
	$(document).ready(function() {

        $('#country_id').change(_get_related_state)

        var country = ''
        if (document.getElementById('country_id') && document.getElementById('country_id').value)
        {
        	var country = document.getElementById('country_id').value;
        	if(country){
        		rpc('/get-related-state', {'country_id': country}).then(function(data){
		    		if(data.state_ids){
		    			$("#div_state").show();
		    			$("#state_id").html(data.state_vals)
		    		}else{
		    			$("#div_state").hide();
		    		}
				});
        	}
        	        	
        }
        else{
    		$("#div_state").hide();
    	}

        function _get_related_state(){
            if (document.getElementById('country_id') && document.getElementById('country_id').value){
            var country = document.getElementById('country_id').value;
        	if(country){
    			rpc('/get-related-state', {'country_id': country}).then(function(data){
		    		if(data.state_ids){
		    			$("#div_state").show();
		    			$("#state_id").html(data.state_vals)
		    		}else{
		    			$("#div_state").hide();
		    		}
				});
        		}
			}
        }
	})
// })