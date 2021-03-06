// Copyright (c) 2017, Frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bench Setting', {
	onload: function(frm) {
		frappe._output_target = $('<pre class="console"><code></code></pre>')
			.appendTo(frm.get_field('run_command_output').wrapper)
			.find('code')
			.get(0);
		let site_config_fields = ["background_workers", "shallow_clone", "admin_password",
			"auto_email_id", "auto_update", "frappe_user", "global_help_setup",
			"dropbox_access_key", "dropbox_secret_key", "gunicorn_workers", "github_username",
			"github_password", "mail_login", "mail_password", "mail_port", "mail_server",
			"use_tls", "rebase_on_pull", "redis_cache", "redis_queue", "redis_socketio",
			"restart_supervisor_on_update", "root_password", "serve_default_site",
			"socketio_port", "update_bench_on_update", "webserver_port", "developer_mode"];
		site_config_fields.forEach(function(val){
			frm.toggle_display(val, frm.doc[val] != undefined);
		});
	},
	refresh: function(frm) {
		frm.add_custom_button(__("Update"), function(){
			let key = frappe.datetime.get_datetime_as_string();
			console_dialog(key);
			frappe.call({
				method: 'bench_manager.bench_manager.utils.console_command',
				args: {
					doctype: frm.doctype,
					docname: frm.doc.name,
					bench_command: 'update',
					key: key
				},
				btn: this
			});
		});
		frm.add_custom_button(__('Sync Backups'), () => {
			frappe.call({
				method: 'bench_manager.bench_manager.doctype.bench_setting.bench_setting.sync_backups'
			});
		});
		frm.add_custom_button(__('Sync Sites'), () => {
			frappe.call({
				method: 'bench_manager.bench_manager.doctype.bench_setting.bench_setting.sync_sites'
			});
		});
		frm.add_custom_button(__('Sync Apps'), () => {
			frappe.call({
				method: 'bench_manager.bench_manager.doctype.bench_setting.bench_setting.sync_apps'
			});
		});
	}
});