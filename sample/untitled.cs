using System;
using System.Data;
using System.Data.SqlClient;
using System.EnterpriseServices;

[Transaction(TransactionOption.Required)]
public class Customers : ServicedComponent
{
public Customers()
{
}

//code for the class
}
This class is now considered a configured class, and consequently has access to its associated context object, when it is instantiated by another application.

A look at the UpdateDetailQuantity method will show this:

public bool UpdateDetailQuantity(int OrderID, string ProductName, int Quantity)
{
      SqlConnection cn = CreateConnection();
      cn.Open();
      try
      {
      if(!ContextUtil.IsInTransaction)
            throw new Exception("Requires Transaction");

string CommandText = "Update [Order Details] set Quantity =
"+Quantity+" where
            OrderID = "+OrderID+" AND [Order Details].ProductID IN";

            CommandText+= "(Select ProductID from Products where ProductName =
'"+ProductName+"')";

      SqlCommand cmd = new SqlCommand();
      cmd.Connection = cn;
      cmd.CommandType = CommandType.Text;
      cmd.CommandText = CommandText;
      cmd.ExecuteNonQuery();
      ContextUtil.SetComplete();
      return true;
      }
     catch (Exception e)
      {
            cn.Close();
            ContextUtil.SetAbort();
            return false;
      }
      finally
      {
            cn.Close()
      }
}