function validate()
{
	var error = true;
	document.check_out.custName.background = "Red";
	if (document.check_out.custName.value == "")
	{
		error_type = 1;
		document.check_out.custName.focus();
		error = false;
	}
	if (document.check_out.address.value == "")
	{
		error_type = 1;
		document.check_out.address.focus();
		error = false;
	}
	if (document.check_out.suburb.value == "")
	{
		error_type = 1;
		document.check_out.suburb.focus();
		error = false;
	}
	if (document.check_out.state.value == "")
	{
		error_type = 1;
		document.check_out.state.focus();
		error = false;
	}
	if (document.check_out.country.value == "")
	{
		error_type = 1;
		document.check_out.country.focus();
		error = false;
	}
	if (document.check_out.email.value == "")
	{
		error_type = 1;
		document.check_out.email.focus();
		error = false;
	}

	if (error == false)
	{
		alert("The required fields are not filled in.");
	} 
	else
	{
		return true;
	}
}

function validate_form()
{	
	document.write ("HERE AT VALIDATE_FORM");
	var bool = true;
	if (hasblanks()){
		alert("One or more compulsory\nfields is blank");
		bool = false;
	}
	document.write("Finally returning "+ bool);
	return bool;

}

function hasblanks()
{
	var compulsory_fields = new Array("custName","address","suburb","state","country","email");
	for (i=0;i<compulsory_fields.length;i++)
	{
		document.write("I am here at "+i+" "+compulsory_fields[i]+ " ");
		document.write(document.getElementById(compulsory_fields[i]));
		var form_field = document.getElementById(compulsory_fields[i]);
		document.write(" This is the value of form_field : "+ form_field);
		document.write("****************************");
		if (form_field == "")
		{
			document.write("Entered inside");
			return true;
		}
	}
	document.write("..................Exited forloop...");
	return false;
}	

