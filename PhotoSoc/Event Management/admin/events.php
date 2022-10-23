<?php include('db_connect.php');?>

<div class="container-fluid">
	
	<div class="col-lg-12">
		<div class="row mb-4 mt-4">
			<div class="col-md-12">
				
			</div>
		</div>
		<div class="row">
			<!-- FORM Panel -->

			<!-- Table Panel -->
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<b>List of Events</b>
						<span class="float:right"><a class="btn btn-primary btn-block btn-sm col-sm-2 float-right" href="index.php?page=manage_event" id="new_event">
					<i class="fa fa-plus"></i> New Entry
				</a></span>
					</div>
					<div class="card-body">
						<table class="table table-condensed table-bordered table-hover">
							<colgroup>
								<col width="5%">
								<col width="20%">
								<col width="15%">
								<col width="15%">
								<col width="30%">
								<col width="15%">
							</colgroup>
							<thead>
								<tr>
									<th class="text-center">#</th>
									<th class="">Schedule</th>
									<th class="">Venue</th>
									<th class="">Event Info.</th>
									<th class="">Description</th>
									<th class="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								<?php 
								$i = 1;
								$events = $conn->query("SELECT e.*,v.venue FROM events e inner join venue v on v.id=e.venue_id order by e.id asc");
								while($row=$events->fetch_assoc()):
									$trans = get_html_translation_table(HTML_ENTITIES,ENT_QUOTES);
									unset($trans["\""], $trans["<"], $trans[">"], $trans["<h2"]);
									$desc = strtr(html_entity_decode($row['description']),$trans);
									$desc=str_replace(array("<li>","</li>"), array("",","), $desc);
								?>
								<tr>
									<td class="text-center"><?php echo $i++ ?></td>
									<td class="">
										 <p> <b><?php echo date("M d, Y h:i A",strtotime($row['schedule'])) ?></b></p>
									</td>
									<td class="">
										 <p> <b><?php echo ucwords($row['venue']) ?></b></p>
									</td>
									<td class="">
										 <p>Event: <b><?php echo ucwords($row['event']) ?></b></p>
										 <p><small>Type: <b><?php echo $row['type']  == 1 ? "Public Event" : "Private Event" ?></small></b></p>
										 <p><small>Fee: <b><?php echo $row['payment_type']  == 1 ? "Free" : number_format($row['amount'],2) ?></small></b></p>

									</td>
									<td>
										 <p class="truncate"><?php echo strip_tags($desc) ?></p>
									</td>
									<td class="text-center">
										<button class="btn btn-sm btn-outline-primary view_event" type="button" data-id="<?php echo $row['id'] ?>" >View</button>
										<button class="btn btn-sm btn-outline-primary edit_event" type="button" data-id="<?php echo $row['id'] ?>" >Edit</button>
										<button class="btn btn-sm btn-outline-danger delete_event" type="button" data-id="<?php echo $row['id'] ?>">Delete</button>
									</td>
								</tr>
								<?php endwhile; ?>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!-- Table Panel -->
		</div>
	</div>	

</div>
<style>
	
	td{
		vertical-align: middle !important;
	}
	td p{
		margin: unset
	}
	img{
		max-width:100px;
		max-height: :150px;
	}
</style>
<script>
	$(document).ready(function(){
		$('table').dataTable()
	})
	
	$('.view_event').click(function(){
		location.href ="index.php?page=view_event&id="+$(this).attr('data-id')
		
	})
	$('.edit_event').click(function(){
		location.href ="index.php?page=manage_event&id="+$(this).attr('data-id')
		
	})
	$('.delete_event').click(function(){
		_conf("Are you sure to delete this event?","delete_event",[$(this).attr('data-id')])
	})
	
	function delete_event($id){
		start_load()
		$.ajax({
			url:'ajax.php?action=delete_event',
			method:'POST',
			data:{id:$id},
			success:function(resp){
				if(resp==1){
					alert_toast("Data successfully deleted",'success')
					setTimeout(function(){
						location.reload()
					},1500)

				}
			}
		})
	}
</script>