<?php include 'db_connect.php' ?>
<div class="container-fluid">
	<div class="col-lg-12">
		<div class="card">
			<div class="card-header">
				Event Audience Report
			</div>
			<div class="card-body">
				<div class="col-md-12">
					<form action="" id="filter">
						<div class="row form-group">
							<div class="col-md-4">
					            <label for="" class="control-label">Event</label>
					            <select name="event_id" id="event_id" class="custom-select select2">
					                <option></option>
					                <?php 
					                $event = $conn->query("SELECT * FROM events order by event asc");
					                while($row=$event->fetch_assoc()):
					                ?>
					                <option value="<?php echo $row['id'] ?>" <?php echo isset($event_id) && $event_id == $row['id'] ? 'selected' : '' ?>><?php echo ucwords($row['event']) ?></option>
					            <?php endwhile; ?>
					            </select>
					        </div>
							<div class="col-md-2">
					            <label for="" class="control-label">&nbsp;</label>
					            <button class="btn-primary btn-sm btn-block col-sm-12">Filter</button>
					        </div>
					        <div class="col-md-2">
					            <label for="" class="control-label">&nbsp;</label>
					            <button class="btn-success btn-sm btn-block col-sm-12" id="print" type="button"><i class="fa fa-print"></i> Print</button>
					        </div>
						</div>
					</form>
					<hr>
					<div class="row" id="printable">
						<div id="onPrint">
							<p class="text-center">Audience List and Details</p>
							<hr>
							<p class="">Event: <span id="ename"></span></p>
							<p class="">Venue: <span id="evenue"></span></p>
						</div>	
						<table class="table table-bordered">
							<thead>
								<th class="text-center">#</th>
								<th class="text-center">Name</th>
								<th class="text-center">Email</th>
								<th class="text-center">Contact</th>
								<th class="text-center">Payment Status</th>
							</thead>
							<tbody>
								<tr><th colspan="5"><center>Select Event First.</center></th></tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<style type="text/css">
	#onPrint{
		display: none;
	}
</style>
<noscript>
	<style>
		table{
			width:100%;
			border-collapse: collapse;
		}
		tr, td, th{
			border: 1px solid black;
		}
		.text-center{
			text-align:center;
		}
		p{
			font-weight: 600
		}
	</style>
	
</noscript>
<script>
	$('#filter').submit(function(e){
		e.preventDefault()
		start_load()
		$.ajax({
			url:'ajax.php?action=get_audience_report',
			method:'POST',
			data:{event_id:$('#event_id').val()},
			success:function(resp){
				if(resp){
					resp = JSON.parse(resp)
					if(!!resp.event){
						$('#ename').html(resp.event.event)
						$('#evenue').html(resp.event.venue)
					}
					if(!!resp.data && Object.keys(resp.data).length > 0){
						$('table tbody').html('')
							var i = 1;
						Object.keys(resp.data).map(k=>{
							var tr = $('<tr class="item"></tr>')
							tr.append('<td class="text-center">'+(i++)+'</td>')
							tr.append('<td class="">'+resp.data[k].name+'</td>')
							tr.append('<td class="">'+resp.data[k].email+'</td>')
							tr.append('<td class="">'+resp.data[k].contact+'</td>')
							tr.append('<td class="">'+resp.data[k].pstatus+'</td>')
						$('table tbody').append(tr)
						})
						
					}else{
						$('table tbody').html('<tr><th colspan="5"><center>No Data.</center></th></tr>')
					}
				}
			},
			complete:function(){
				end_load()
			}
		})
	})
	$('#print').click(function(){
		if($('table tbody').find('.item').length <= 0){
			alert_toast("No Data to Print",'warning')
			return false;
		}
		var nw= window.open("","_blank","width=900,heigth=600")
		nw.document.write($('noscript').html())
		nw.document.write($('#printable').html())
		nw.document.close()
		nw.print()
		setTimeout(function(){
			nw.close()
		},700)
	})
</script>