function deepEqual(a,b){
    if(a === b){
			return true; //if same obj reference
		}
		if ( a == null || typeof a != "object" || b == null || typeof b != "object"){
			return false; //if a or b null or not an obj(primitives)
		}
		for (var prop in a) {
	    if (b.hasOwnProperty(prop)) { //if properties matches
	        if (! deepEqual(a[prop], b[prop]) ) //if props not matches in recursion
	            return false; 
	    } else {
	        return false; //different props
    }
	}
	return true;
}