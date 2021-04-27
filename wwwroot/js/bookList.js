let dataTable;

$(document).ready(loadDataTable);

function loadDataTable() {

    dataTable = $('#DT_load').DataTable({
        ajax: {
            url: '/api/book',
            type: 'GET',
            datatype: 'json'
        },

        columns: [
            {
                data: 'name',
                width: '20%'
            },
            {
                data: 'author',
                width: '20%'
            },
            {
                data: 'isbn',
                width: '20%'
            },
            {
                data: 'id',
                width: '40%',
                render: (id) => {
                    return `
                        <div class="text-center">
                            <a href="/BookList/Upsert?id=${id}" class="btn btn-success text-white" style="cursor: pointer; width: 100px;">
                                Edit
                            </a>&nbsp;
                            <a class="btn btn-danger text-white" style="cursor: pointer; width: 100px;" onclick="Delete('/api/book?id=${id}');">
                                Delete
                            </a>
                        </div>
                    `;
                }
            }
        ],
        language: {
            emptyTable: 'No table found!'
        },
        width: '100%'
    });
}

function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover!',
        icon: 'warning',
        dangerMode: true,
        showCancelButton: true
    })
        .then((willDelete) => {
            if (willDelete && willDelete.isConfirmed) {
                $.ajax({
                    url: url,
                    type: 'DELETE',
                    success: (data) => {
                        if (data && data.success) {
                            toastr.success(data.message);
                            dataTable.ajax.reload();
                        }
                        else {
                            toastr.error(data.message || 'An error ocurred');
                        }
                    }
                });
            }
    });
}